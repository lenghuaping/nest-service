import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ type: 'int', generated: 'increment' })
  public id: number;

  @Column({ type: 'char', length: 32 })
  public email: string;

  @Column({ type: 'varchar', length: 255 })
  public work_space: string;

  @CreateDateColumn({ type: 'datetime' })
  private create_date;
}
