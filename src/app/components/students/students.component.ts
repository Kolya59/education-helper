import { AfterViewInit, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { IStudent } from '../../models/student.model';
import { selectStudentList } from '../../store/selectors/students.selectors';
import { AddStudent, GetStudents } from '../../store/actions/student.actions';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, AfterViewInit {
  public noData: IStudent[] = [<IStudent>{}];
  public columnsToDisplay: string[] = [
    'Код ребенка',
    'Фамилия ребенка',
    'Имя ребенка',
    'Дата рождения',
    'Имя отчество родителя',
    'Контактный телефон',
  ];
  public dataSource: MatTableDataSource<IStudent> = new MatTableDataSource(
    this.noData
  );
  public selectedElement: IStudent | null = null;
  studentForm = new FormGroup({
    surname: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    parent: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectStudentList))
      .subscribe((students) => this.initializeData(students));
  }

  ngAfterViewInit(): void {
    this.loadStudents();
  }

  selectStudent(student: IStudent) {
    console.log(student);
    this.studentForm.patchValue({
      surname: student['Фамилия ребенка'],
      name: student['Имя ребенка'],
      birthdate: student['Дата рождения'],
      parent: student['Имя отчество родителя'],
      phone: student['Контактный телефон'],
    });
  }

  isSelectedStudent(student: IStudent): boolean {
    return true;

    /*
    return new Promise<boolean>((resolve) => {
      this.store
        .pipe(select(selectSelectedStudent))
        .subscribe((selected: IStudent) => {
          resolve(selected['Код ребенка'] == student['Код ребенка']);
        });
    });
     */
  }

  onSubmit() {}

  addStudent() {
    console.log('add', this.studentForm.value);
    this.store.dispatch(
      new AddStudent({
        'Код ребенка': '0',
        'Фамилия ребенка': this.studentForm.value.surname,
        'Имя ребенка': this.studentForm.value.name,
        'Дата рождения': this.studentForm.value.birthdate,
        'Имя отчество родителя': this.studentForm.value.parent,
        'Контактный телефон': this.studentForm.value.phone,
      })
    );
    this.loadStudents();
  }

  private loadStudents(): void {
    this.store.dispatch(new GetStudents());
  }

  private initializeData(students: IStudent[]): void {
    this.dataSource = new MatTableDataSource(
      students.length ? students : this.noData
    );
  }
}
