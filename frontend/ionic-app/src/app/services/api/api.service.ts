import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5555';

  constructor(private http: HttpClient) {}

  async getAll<T>(endpoint: string): Promise<T[]> {
    const url = `${this.baseUrl}/${endpoint}/`;
    const response = await fetch(url);
    return (await response.json()) ?? [];
  }

  async getById<T>(endpoint: string, id: any): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    const response = await fetch(url);
    return (await response.json()) ?? {};
  }

  async add<T>(endpoint: string, item: T): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return (await response.json()) ?? {};
  }

  async update<T>(endpoint: string, id: any, item: T): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return (await response.json()) ?? {};
  }

  async delete(endpoint: string, id: any): Promise<void> {
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    await fetch(url, {
      method: 'DELETE',
    });
  }

  

  //can still refactor ?
  // check if still working wuthouth credentials include
  async login<T>(
    endpoint: string,
    username: string,
    password: string
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}/${endpoint}/login`;
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        let { message } = await response.json();
        throw new Error(message);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async logout<T>(): Promise<T> {
    const url = `${this.baseUrl}/logout`;

    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) ?? {};
  }

  //get user = /getUser

  async getUser<T>(): Promise<T> {
    try {
      const url = `${this.baseUrl}/getUser`;

      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response, 'getUser response');
      if (!response.ok) {
        let { message } = await response.json();
        throw new Error(message);
      }
      // refactor why need to return empty obj?: return (await response.json()) ?? {};

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async getPendingMatch<T>(): Promise<T> {
    try {
      const url = `${this.baseUrl}/getUser`;

      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response, 'getUser response');
      if (!response.ok) {
        let { message } = await response.json();
        throw new Error(message);
      }
      // refactor why need to return empty obj?: return (await response.json()) ?? {};

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
