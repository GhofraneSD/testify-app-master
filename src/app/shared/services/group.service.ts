import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces';
import { Group } from '../interfaces/group.interface';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  save(group: Group): Observable<Group> {
    return this.http.post<Group>('/api/group', group).pipe(
      tap((group: Group) => {
        console.log(group);
        return group;
      })
    );
  }

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>('/api/group').pipe(
      tap((groups: Group[]) => {
        console.log(groups);
        return groups;
      })
    );
  }

  getOne(id: any): Observable<Group> {
    return this.http.get<Group>('/api/group/' + id.toString()).pipe(
      tap((group: Group) => {
        console.log(group);
        return group;
      })
    );
  }

  getGroupMembers(id: any): Observable<User[]> {
    return this.http.get<User[]>('/api/group/' + id.toString()).pipe(
      tap((users: User[]) => {
        console.log(users);
        return users;
      })
    );
  }

  deletOne(id: any): Observable<any> {
    return this.http.delete<any>('/api/group/' + id.toString()).pipe(
      tap(() => {
        console.log('group deleted');
      })
    );
  }

  getGroupsByModerator(id: any): Observable<Group[]> {
    return this.http
      .get<Group[]>('/api/group/moderatedBy/' + id.toString())
      .pipe(
        tap((groups: Group[]) => {
          console.log(groups);
          return groups;
        })
      );
  }

  getGroupsByMembership(id: any): Observable<Group[]> {
    return this.http
      .get<Group[]>('/api/group/membership/' + id.toString())
      .pipe(
        tap((groups: Group[]) => {
          console.log(groups);
          return groups;
        })
      );
  }

  addUserToGroup(groupId: any, userId: any): Observable<Group> {
    return this.http
      .patch<Group>(
        '/api/group/' +
          groupId.toString() +
          '/members/add/' +
          userId.toString(),
        {}
      )
      .pipe(
        tap((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  removeUserFromGroup(groupId: any, userId: any): Observable<Group> {
    return this.http
      .patch<Group>(
        '/api/group/' +
          groupId.toString() +
          '/members/remove/' +
          userId.toString(),
        {}
      )
      .pipe(
        tap((res: any) => {
          console.log(res);
          return res;
        })
      );
  }
}
