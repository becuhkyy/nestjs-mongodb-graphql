import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { AssingStudentsToLessonInput } from './assign-students.input';
import { StudentService } from 'src/student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('assingStudentsToLessonInput')
    assignStudentsToLessonInput: AssingStudentsToLessonInput,
  ) {
    return this.lessonService.assingStudentsToLesson(
      assignStudentsToLessonInput,
    );
  }

  @ResolveField()
  students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
