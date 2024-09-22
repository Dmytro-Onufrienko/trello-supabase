import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';
import { Table } from '../../config/Table';
import { BoardService } from './Board/board.service';
import { CardService } from './Card/card.service';
import { ListService } from './List/list.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private supabase: SupabaseClient;
  public board: BoardService;
  public list: ListService;
  public card: CardService;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.board = new BoardService(this.supabase);
    this.list = new ListService(this.supabase);
    this.card = new CardService(this.supabase);
  }
}
