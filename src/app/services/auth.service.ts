import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          storage: localStorage,
        },
      }
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      const isSignedWithUser = event === 'SIGNED_IN' && session?.user;

      if (!isSignedWithUser) {
        this.router.navigateByUrl('/', { replaceUrl: true });
      }

      this._currentUser.next(session?.user || null);
    });
  }

  async getCurrentUser() {
    const { data, error } = await this.supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    console.log('user', data.user);
    this._currentUser.next(data.user);
  }

  signInWithEmail(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }
}
