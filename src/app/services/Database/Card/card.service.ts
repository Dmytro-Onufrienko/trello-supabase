import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Table } from '../../../config/Table';
import { IDatabaseService } from '../databaseService.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService implements IDatabaseService {
  constructor(private supabase: SupabaseClient) {}

  async getById(id: string) {
    return await this.supabase
      .from(Table.CARD)
      .select('*')
      .match({ id })
      .single();
  }

  async getAll(listId: string) {
    const lists = await this.supabase
      .from(Table.CARD)
      .select('*')
      .eq('list_id', listId)
      .order('position');
    return lists.data || [];
  }

  async create(listId: string, boardId: string, position = 0) {
    return await this.supabase
      .from(Table.CARD)
      .insert({ board_id: boardId, list_id: listId, position })
      .select('*')
      .single();
  }

  async update(card: any) {
    return await this.supabase
      .from(Table.CARD)
      .update(card)
      .match({ id: card.id });
  }

  async delete(card: any) {
    return await this.supabase.from(Table.CARD).delete().match({ id: card.id });
  }
}
