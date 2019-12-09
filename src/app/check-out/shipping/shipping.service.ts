import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from './address.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Injectable({providedIn: "root"})
export class ShippingService {
    private address: Address[];
    private addressChanged = new Subject<Address[]>();
    private stopEditMode = new Subject<boolean>();

    constructor(private http: HttpClient) {}

    getAddressStatus() {
        return this.addressChanged.asObservable();
    }

    getStopEditMode() {
        return this.stopEditMode.asObservable();
    }

    getAllAddress(userId: number){
        this.http
            .get<{ address: Address[] }>(`http://localhost:3000/user-address/${userId}`)
            .subscribe(response => {
                this.address = response.address;
                this.addressChanged.next([...this.address]);
            })
    }

    updateAddress(addressId: number, updatedAddress: any, userId: number){
        this.http
        .put(`http://localhost:3000/user-address/${userId}/${addressId}`, { address: updatedAddress })
        .subscribe(response => {
            const index = this.address.findIndex(addr => addr.addressId === addressId);
            this.address[index] = updatedAddress;
            this.addressChanged.next([...this.address]);
            this.stopEditMode.next(true);
        })
        
    }

    addNewAddress(userId: number, newAddress: any) {
        this.http
        .post<{ addressId: number }>(`http://localhost:3000/user-address/${userId}`, { address: newAddress })
        .subscribe(response => {
            this.address.push({
                ...newAddress,
                addressId: response.addressId,
                userId: userId
            });
            this.addressChanged.next([...this.address]);
        })
    }
}