import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryColumn({ type: 'int', generated: 'increment' })
  private id: number;

  @Column({ type: 'char', length: 16 })
  private name: string;

  @Column({ type: 'char', length: 16 })
  private description: string;

  @Column({ type: 'char', length: 32 })
  private code: string;

  @Column({ type: 'char', length: 16 })
  private type: string;

  @CreateDateColumn({ type: 'datetime' })
  private creat_date;

  @UpdateDateColumn({ type: 'datetime' })
  private update_date;
}
