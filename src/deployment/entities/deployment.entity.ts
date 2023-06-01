import { Gitlab } from '@/gitlab/entities/gitlab.entity';
import { User } from '@/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Deployment {
  @PrimaryColumn({ type: 'int', generated: 'increment' })
  public id: number;

  @Column({ default: '' })
  public name: string;
  @ManyToMany(() => Gitlab)
  @JoinTable()
  public gitlabs: Gitlab[];
  @Column()
  public branch_name: string;
  @OneToOne(() => User)
  @JoinColumn()
  private user: User;
  @CreateDateColumn({ type: 'datetime', update: false })
  private creat_date;

  @UpdateDateColumn({ type: 'datetime' })
  private update_date;
}
