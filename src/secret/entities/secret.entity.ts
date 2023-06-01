import { User } from '@/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Secret {
  @PrimaryColumn({ type: 'int', generated: 'increment' })
  public id: number;

  @OneToOne(() => User)
  @JoinColumn()
  public user: User;

  @Column()
  public secret: string;

  @Column({ default: '' })
  public name: string;

  @CreateDateColumn({ type: 'datetime', update: false })
  private creat_date;

  @UpdateDateColumn({ type: 'datetime' })
  private update_date;
}
