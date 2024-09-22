import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/Auth/auth.service';
import { DataService } from '../../../services/Database/data.service';
import { User } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
})
export class WorkspaceComponent implements OnInit {
  boards: any[] = [];
  user: Observable<User | null>;

  constructor(
    private auth: AuthService,
    private dataService: DataService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.user = this.auth.currentUser;
  }

  async ngOnInit(): Promise<void> {
    await this.getBoards();
  }

  signOut(): void {
    this.auth.signOut();
  }

  async getBoards(): Promise<void> {
    this.spinner.show();
    this.boards = await this.dataService.board.getAll();
    console.log(this.boards);
    this.spinner.hide();
  }

  async createBoard() {
    this.spinner.show();
    await this.dataService.board.create();
    await this.getBoards();
    this.spinner.hide();
    await this.router.navigateByUrl(
      `/workspace/${this.boards.reverse()[0].boards.id}`
    );
  }
}
