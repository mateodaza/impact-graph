import { Field, ID, Float, ObjectType, Authorized } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ColumnOptions,
  JoinTable, 
  BaseEntity,
  Index
} from 'typeorm'

import { Organisation } from './organisation'

// import { OrganisationProject } from './organisationProject'
// NO idea why the below import doesn't work!!!
// import { RelationColumn } from "../helpers";
function RelationColumn (options?: ColumnOptions) {
  return Column({ nullable: true, ...options })
}

@Entity()
@ObjectType()
class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  @Field()
  name: string;

  @ManyToMany(type => Project, project => project.categories)
  projects: Project[];
}

@Entity()
@ObjectType()
class Project extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  admin?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  organisationId?: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  creationDate: Date

  @Field(type => [Organisation])
  @ManyToMany(type => Organisation)
  @JoinTable()
  organisations: Organisation[]

  @Field({ nullable: true })
  @Column({ nullable: true })
  coOrdinates?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  impactLocation?: string

  @Field(type => [Category], { nullable: true })
  @ManyToMany(type => Category,category => category.projects, { nullable: true, eager: true, cascade: true })
  @JoinTable()
  categories: Category[];

  @Field(type=> Float, { nullable: true })
  @Column('float', { nullable: true })
  balance: number = 0
  
  @Field()
  @Column({ nullable: true })
  stripeAccountId?: string
  // @Field(type => [OrganisationProject], { nullable: true })
  // @OneToMany(
  //   type => OrganisationProject,
  //   organisationProject => organisationProject.organisation
  // )
  // organisationProjects?: OrganisationProject[]
  // @JoinTable({
  //   name: 'organisation_project',
  //   joinColumn: {
  //     name: 'id',
  //     referencedColumnName: 'organisation_project_id'
  //   }
  // })

  // TODO: add the user back in, after model is clean
  // @Field(type => User)
  // @ManyToOne(type => User)
  // author: User

  // @RelationColumn()
  // authorId: number
}

export {
  Project,
  Category,
}