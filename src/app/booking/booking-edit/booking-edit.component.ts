import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { BookingService } from '../Booking.service';


@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.css']
})
export class BookingEditComponent implements OnInit {
  id: number;
  editMode = false;
  bookingForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private bookingService: BookingService,
              private router: Router
  ) { }
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          console.log(this.editMode);
          this.initForm(); // call initform whenever route params change 
        }
      );
  }

  onSubmit() {
    // const newBooking = new Booking(
    //   this.bookingForm.value['name'],
    //   this.bookingForm.value['description'],
    //   this.bookingForm.value['imagePath'],
      // this.bookingForm.value['ingredients']
      // );

    if (this.editMode) {
      this.bookingService.updateBooking(this.id, this.bookingForm.value);
    } else {
      this.bookingService.addBooking(this.bookingForm.value);
    }
    this.onCancel();
  }

  // onAddAppointment() {
  //   // (<FormArray>this.recipeForm.get('ingredients')).push(
  //   //   new FormGroup({
  //   //     'name': new FormControl(null, Validators.required),
  //   //     'amount': new FormControl(null, [
  //   //       Validators.required,
  //   //       Validators.pattern(/^[1-9]+[0-9]*$/)
  //   //     ])
  //   //   })
  //   // );
  // }

  // onDeleteAppointment(index: number) {
    // (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  // }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  //to retrieve the current array of booking slice
  private initForm() {
    let bookingName = '';
    let bookingImagePath = '';
    let bookingDescription = '';
    let bookingIc = '';
    let bookingAge = Number(); //number const
    let bookingSex = '';
    let bookingRace = '';
    let bookingPhone = Number();
    let bookingWork = '';

    // let bookingIngredients = new FormArray([]);

    if (this.editMode) {
      const booking = this.bookingService.getBooking(this.id);
      bookingName = booking.name;
      bookingImagePath = booking.imagePath;
      bookingDescription = booking.description;
      bookingIc = booking.ic;
      bookingAge = booking.age;
      bookingSex = booking.sex;
      bookingRace = booking.race;
      bookingPhone = booking.phone;
      bookingWork = booking.work;

      // if (recipe['appointments']) {
      //   for (let ingredient of recipe.appointments) {
      //     bookingIngredients.push(
      //       new FormGroup({
      //         'name': new FormControl(ingredient.name, Validators.required),
      //         'amount': new FormControl(ingredient.amount, [
      //           Validators.required,
      //           Validators.pattern(/^[1-9]+[0-9]*$/)
      //         ])
      //       })
      //     );
      //   }
      // }
    }

    this.bookingForm = new FormGroup({
      'name': new FormControl(bookingName, Validators.required),
      'imagePath': new FormControl(bookingImagePath, Validators.required),
      'description': new FormControl(bookingDescription, Validators.required),
      'ic': new FormControl(bookingIc, Validators.required),
      'age': new FormControl(bookingAge, Validators.required),
      'sex': new FormControl(bookingSex, Validators.required),
      'race': new FormControl(bookingRace, Validators.required),
      'phone': new FormControl(bookingPhone, Validators.required),
      'work': new FormControl(bookingWork, Validators.required),


      // 'ingredients': bookingIngredients
    });
  }

}
