import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Table } from '../../../config/Table';
import { IDatabaseService } from '../databaseService.interface';

@Injectable({
  providedIn: 'root',
})
export class ListService implements IDatabaseService {
  constructor(private supabase: SupabaseClient) {}

  async getById(id: string) {
    return await this.supabase
      .from(Table.LIST)
      .select('*')
      .match({ id })
      .single();
  }

  async getAll(id: string) {
    const lists = await this.supabase
      .from(Table.LIST)
      .select('*')
      .eq('board_id', id)
      .order('position');
    return lists.data || [];
  }

  async create(boardId: string, position = 0) {
    return await this.supabase
      .from(Table.LIST)
      .insert({ board_id: boardId, position, title: 'New List' })
      .select('*')
      .single();
  }

  async update(list: any) {
    return await this.supabase
      .from(Table.LIST)
      .update(list)
      .match({ id: list.id });
  }

  async delete(list: any) {
    return await this.supabase.from(Table.LIST).delete().match({ id: list.id });
  }
}
