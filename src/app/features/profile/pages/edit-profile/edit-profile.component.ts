import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './../../services/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  // props
  profileEditForm: FormGroup;
  formSubmitted = false;
  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildEditProfileForm();
  }

  buildEditProfileForm() {
    this.profileEditForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  get currentPassErrorMessage() {
    return this.profileEditForm.controls['currentPassword'];
  }

  get newPassErrorMessage() {
    return this.profileEditForm.controls['newPassword'];
  }

  // error block
  getCurrentPassErrorMessage() {
    return this.profileEditForm.controls['currentPassword'].hasError('required')
      ? 'Current password required.'
      : '';
  }
  getNewPassErrorMessage() {
    return this.profileEditForm.controls['newPassword'].hasError('required')
      ? 'New Password password required.'
      : '';
  }

  onSave() {
    this.formSubmitted = true;
    if (this.profileEditForm.valid) {
      this.profileService.changeDetail(this.profileEditForm.value).subscribe(
        (res) => {
          console.log('changed profile successfully.');
        },
        (err) => {
          err = err.error.message
            ? this.toastr.error(err.error.message)
            : this.toastr.error('Error add new mortgage detail.');
        }
      );
    } else {
      console.log('invalid profile edit form');
    }
  }

  onCancel() {
    this.router.navigate(['/ganapati/profile']);
  }
}
