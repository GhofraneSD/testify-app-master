import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Exam } from '@app/shared/interfaces/exam.interface';
import { User } from '@app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { OrganizerRequest } from '../interfaces/organizerRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/user').pipe(
      tap((users: User[]) => {
        console.log(users);
      })
    );
  }

  getAllOrganizerRequest(): Observable<OrganizerRequest[]> {
    return this.http.get<OrganizerRequest[]>('/api/user/requestOrganizer').pipe(
      tap((requestOrg: OrganizerRequest[]) => {
        console.log(requestOrg);
        return requestOrg;
      })
    );
  }

  addOrganizerRequest(organizerRequest: any): Observable<OrganizerRequest> {
    return this.http
      .post<OrganizerRequest>('/api/user/requestOrganizer', organizerRequest)
      .pipe(
        tap((organizerRequest: OrganizerRequest) => {
          console.log(organizerRequest);
        })
      );
  }

  acceptOrganizerRequest(
    organizerRequestId: any
  ): Observable<OrganizerRequest> {
    return this.http
      .patch<OrganizerRequest>(
        '/api/user/requestOrganizer/:organizerRequestId/accept',
        {}
      )
      .pipe(
        tap((organizerRequest: OrganizerRequest) => {
          console.log(organizerRequest);
        })
      );
  }

  rejectOrganizerRequest(
    organizerRequestId: any
  ): Observable<OrganizerRequest> {
    return this.http
      .patch<OrganizerRequest>(
        '/api/user/requestOrganizer/:organizerRequestId/reject',
        {}
      )
      .pipe(
        tap((organizerRequest: OrganizerRequest) => {
          console.log(organizerRequest);
        })
      );
  }

  addRole(userId: string, role: string): Observable<User> {
    return this.http
      .post<User>(`/api/user/${userId.toString()}/role`, { role: role })
      .pipe(
        tap((user: User) => {
          console.log(user);
        })
      );
  }

  saveAvatar(image: any, userId: string) {
    return this.http.put(`/api/user/${userId}/sendAvatar`, image);
  }
}
