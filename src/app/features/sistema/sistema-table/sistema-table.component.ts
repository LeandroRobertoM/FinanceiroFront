import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'; 
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { SistemaService } from 'src/app/services/sistema.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sistema-table',
  templateUrl: './sistema-table.component.html',
  styleUrls: ['./sistema-table.component.scss']
})
export class SistemaTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'nome', 'action']; // Colunas a serem exibidas na tabela
  dataSource = new MatTableDataSource<SistemaFinanceiro>();
  selectedRow: SistemaFinanceiro | null = null; // Para armazenar a linha selecionada
  dataInicio: string = '';
  dataFim: string = '';
  situacao: string = '';

  @ViewChild(MatSort) sort!: MatSort; // Referência para MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referência para MatPaginator

  constructor(
    private authService: AuthService,
    private sistemaService: SistemaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Carregar os dados do sistema no inicializar
    this.sistemaService.ListaSistemaUsuarioTable(this.authService.getEmailUser()).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    // Configurar o paginator e o sort após a inicialização da visão
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   apagarFiltro() {
    this.dataInicio = '';
    this.dataFim = '';
    this.situacao = '';
    this.applyFilter(''); // Para resetar outros filtros se necessário
  }
  filterByDateRange() {
    // Lógica para filtrar os dados pela data de início e data de fim
}

// Método para filtrar por situação
filterBySituacao() {
    // Lógica para filtrar os dados pela situação
  }  


  navigateToSistemaFinanceiroCreate(): void {
    // Navegar para o formulário de criação de um novo sistema
    this.router.navigate(['/Sistema/formulario']);
  }

  selectRow(row: SistemaFinanceiro): void {
    // Selecionar uma linha na tabela
    this.selectedRow = row;
  }

  excluirSistemaFinanceiro(sistema: SistemaFinanceiro): void {
    // Confirmar exclusão do sistema
    if (confirm(`Você deseja excluir o sistema ${sistema.nome}? Todos os registros associados serão removidos.`)) {
      // Implementar lógica de exclusão aqui
      console.log("Sistema excluído: ", sistema);
      // Chamar um método do serviço para excluir o sistema, se necessário
    }
  }

  editSistemaFinanceiro(sistema: SistemaFinanceiro): void {
    // Navegar para o formulário de edição de um sistema
    this.router.navigate(['/Sistema/formulario'], { state: { sistema } });
  }
}
