import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService, private modalService: NgbModal) {

   }

  modalReference: NgbModalRef;
  usersObs: Observable<User[]>;
  userObs: Observable<User>;
  users: User[];
  currentUser: User;
  errorMessage: String;
  resultOb: Observable<User>;
  result: User;
  isLoad: boolean;
  isEdit:boolean;
  isCreate:boolean;
rows= [];

//funtion
 

  addUser(data: User) {
    console.log(data);
    this.isLoad = true;
    this.isCreate = true;
    this.userObs = this.userService.addUser(data);
    this.userObs.subscribe(
      result => {

        this.toastr.success('add thanh cong user: '+data.id,'mesage');
                   this.fetchdata();
                   
      },

      error => this.errorMessage = <any>error,
    )



  }

  deleteUser(id) {
    console.log(id);
     this.userService.deleteUser(id).
              subscribe(
                result => {
                  this.toastr.success('xoa thanh cong user: '+id,'mesage');
                   this.fetchdata();
                },
                error => this.errorMessage = <any>error,
              )
  }
  editUser(content, user: User) {
    this.isCreate = false;
    this.isEdit = true;
    this.currentUser = user;
    this.modalReference = this.modalService.open(content, { centered: true }); this.modalReference.result.then((result) => {
   
     
    }, (reason) => {
       
    });
  }
  
    updateUser(user: User) {
      this.userObs = this.userService.editUser(user);
      this.userObs.subscribe(
        result => {

          this.toastr.success('update thanh cong user: '+user.id,'mesage');
                    this.fetchdata();
                    
        },

        error => this.errorMessage = <any>error,
      )


  
  }
  ngOnInit(): void {
    this.fetchdata();
    this.isCreate = false;
    this.isEdit = false;
    this.currentUser = new User();
     
    this.usersObs.subscribe(

      result => {
        this.users = result
          this.rows = this.users;
        },
      error => this.errorMessage = <any>error,
    )
    this.currentUser = new User();
  

  }
  open(content) {
    this.isCreate = true;
    this.currentUser = new User();
    this.modalReference = this.modalService.open(content, { centered: true }); this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  public fetchdata() {
    this.usersObs = this.userService.getAllUser();
  }


}