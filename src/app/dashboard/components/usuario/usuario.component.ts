import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IUsuario } from '../../../shared/models/usuario.interface';
import { NotificationService } from '../../../shared/services/notification.service';
import { TokenService } from '../../../shared/services/token.service';
import { UsuarioService } from '../../../shared/services/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  imports: [NgIf, NgFor, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule, DatePipe,
    MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  filter: string = '';
  maxPageButtons = 10;
  totalPages!: number;
  data: IUsuario[] = [];
  totalElements!: number;
  currentPage: number = 1;
  startDateISO: string = '';
  endDateISO: string = '';
  itemsPerPage: number = 10; // Itens por página
  sortedColumn: string = ''; // Coluna atualmente ordenada
  sortDirection: 'asc' | 'desc' = 'asc'; // Direção da ordenação
  itemsPerPageOptions: number[] = [5, 10, 15, 20]; // Opções para o seletor
  position: TooltipPosition[] = ['below', 'above', 'left', 'right'];

  constructor(private usuarioService: UsuarioService, private router: Router,
    private route: ActivatedRoute, private notificationService: NotificationService,
    private tokenService: TokenService) {
    this.listarUsuarios();
  }

  ngOnInit() {
    this.detectarDatasSelecionadas();
  }

  limparCampoDeDatas() {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    this.detectarDatasSelecionadas();
  }

  listarUsuarios() {
    this.usuarioService.listarUsuariosPaginados(this.currentPage - 1, this.itemsPerPage, this.filter,
      this.startDateISO, this.endDateISO).subscribe(r => {
        if (r.body) {
          this.data = r.body.usuarios;
          this.totalPages = r.body.totalPages;
          this.totalElements = r.body.totalElements;
          this.startDateISO = '';
          this.endDateISO = '';
        }
      });
  }

  detectarDatasSelecionadas() {
    this.range.valueChanges.subscribe(val => {
      if (val.start && val.end) {
        const startDate: Date = val.start;
        const endDate: Date = val.end;
        // Convertendo para o formato ISO 8601 (compatível com LocalDateTime no backend)
        this.startDateISO = startDate.toISOString().replace("Z", ""); // Ex: "2025-02-12T00:00:00.000Z"
        this.endDateISO = endDate.toISOString().replace("Z", ""); // Ex: "2025-02-28T23:59:59.999Z"
        this.listarUsuarios();
      }
    });
  }

  applyFilter() {
    return this.data.filter(item =>
      Object.values(item).some(value =>
        String(value).trim().toLowerCase().includes(this.filter.trim().toLowerCase())
      )
    );
  }

  sort(property: keyof IUsuario) {
    // Alterna entre a direção de ordenação
    this.sortDirection = this.sortedColumn === property && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortedColumn = property;
    this.data.sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];
      // Comparação baseada na direção da ordenação
      if (this.sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }

  navigateTo(route: string, usuarioId?: number) {
    if (this.router && usuarioId) {
      this.router.navigate([route, usuarioId], { relativeTo: this.route });
    } else {
      this.router.navigate([route], { relativeTo: this.route });
    }
  }

  removerUsuario(usuarioID: number) {
    this.notificationService.showWarning('Essa ação não poderá ser desfeita!',
      'Tem certeza que deseja remover o registro?').then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.removerUsuario(usuarioID).subscribe(
            {
              next: () => {
                this.notificationService.showSuccess('Usuário removido!').then(() => {
                  this.listarUsuarios(); // Será chamado somente depois do usuário clicar "OK"
                });
              },
              error: response => {
                if (response.status === 403 && this.tokenService.isUser()) {
                  this.notificationService.showError('Você não tem permissão para realizar essa ação!')
                    .then(() => {
                      this.listarUsuarios();
                    });
                }
              },
            }
          );
          this.notificationService.showSuccess('O registro está sendo excluido.', 'Excluindo...');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.notificationService.showError('O registro não foi removido :)', 'Cancelado')
            .then(() => {
              this.listarUsuarios();
            });
        }
      })
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.listarUsuarios();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.listarUsuarios();
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages;
    const visiblePages = [];
    let startPage = Math.max(1, this.currentPage - 5); // Mantém o botão selecionado na posição 6
    let endPage = Math.min(totalPages, startPage + this.maxPageButtons - 1);
    // Se não houver 10 páginas à frente do currentPage, ajuste para mostrar até 10 botões
    if (endPage - startPage < this.maxPageButtons - 1) {
      startPage = Math.max(1, endPage - this.maxPageButtons + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  }

  goToPage(page: number) {
    this.currentPage = page; // Define a página atual com base no número clicado
    this.listarUsuarios();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.listarUsuarios();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.listarUsuarios();
  }

  onItemsPerPageChange() {
    this.currentPage = 1; // Reiniciar para a primeira página ao alterar os itens por página
    this.itemsPerPage = Number(this.itemsPerPage); // Garante que seja um número
    this.listarUsuarios();
  }

  baixarRelatorio(formato: string) {
    this.usuarioService.baixarRelatorio(formato).subscribe(response => {
      const blob = response.body;
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio.${formato}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  }

}
