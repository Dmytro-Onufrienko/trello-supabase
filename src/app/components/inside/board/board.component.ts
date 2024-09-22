import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/Database/data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  lists: any[] = []
  boardId: string | null = null
  editTitle: any = {}
  editCard: any = {}
  boardInfo: any = null
  titleChanged = false

  listCards: any = {}
  addUserEmail = ''

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('id')
    if (this.boardId) {
      const board = await this.dataService.board.getById(this.boardId)
      this.boardInfo = board.data
      this.lists = await this.dataService.list.getAll(this.boardId)

      for (let list of this.lists) {
        this.listCards[list.id] = await this.dataService.card.getAll(list.id)
      }

      // For later...
      this.handleRealtimeUpdates()
    }
  }

  async saveBoardTitle() {
    await this.dataService.board.update(this.boardInfo)
    this.titleChanged = false
  }

  async deleteBoard() {
    await this.dataService.board.delete(this.boardInfo)
    this.router.navigateByUrl('/workspace')
  }

  async addList() {
    const newList = await this.dataService.list.create(this.boardId!, this.lists.length)
  }

  editingTitle(list: any, edit = false) {
    this.editTitle[list.id] = edit
  }

  async updateListTitle(list: any) {
    await this.dataService.list.update(list)
    this.editingTitle(list, false)
  }

  async deleteBoardList(list: any) {
    await this.dataService.list.delete(list)
  }

  async addCard(list: any) {
    await this.dataService.card.create(list.id, this.boardId!, this.listCards[list.id].length)
  }

  editingCard(card: any, edit = false) {
    this.editCard[card.id] = edit
  }

  async updateCard(card: any) {
    await this.dataService.card.update(card)
    this.editingCard(card, false)
  }

  async deleteCard(card: any) {
    await this.dataService.card.delete(card)
  }

  async addUser() {
    await this.dataService.board.addUserToBoard(this.boardId!, this.addUserEmail)
    this.addUserEmail = ''
  }

  handleRealtimeUpdates() {
    // TODO
  }
}
