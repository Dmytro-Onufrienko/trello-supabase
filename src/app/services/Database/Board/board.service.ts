import { Injectable } from '@angular/core';
import { Table } from '../../../config/Table';
import { SupabaseClient } from '@supabase/supabase-js';
import { IDatabaseService } from '../databaseService.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardService implements IDatabaseService {
  constructor(private supabase: SupabaseClient) {}

  async getById(id: string) {
    return await this.supabase
      .from(Table.BOARD)
      .select('*')
      .match({ id })
      .single();
  }

  async getAll() {
    const { data } = await this.supabase
      .from(Table.USER_BOARDS)
      .select('boards:board_id(*)');
    return data || [];
  }

  async create() {
    return this.supabase.from(Table.BOARD).insert({});
  }

  async update(board: any) {
    return await this.supabase
      .from(Table.BOARD)
      .update(board)
      .match({ id: board.id });
  }

  async delete(board: any) {
    return await this.supabase
      .from(Table.BOARD)
      .delete()
      .match({ id: board.id });
  }

  async addUserToBoard(boardId: string, email: string) {
    const user = await this.supabase
      .from(Table.USER)
      .select('id')
      .match({ email })
      .single();

    if (user.data?.id) {
      const userId = user.data.id;
      const userBoard = await this.supabase.from(Table.USER_BOARDS).insert({
        user_id: userId,
        board_id: boardId,
      });
      return userBoard;
    } else {
      return null;
    }
  }
}
