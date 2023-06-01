import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Gitlab {
  @Column({ type: 'int' })
  public project_id: number;

  @Column({ type: 'bool' })
  public is_privatization_project: boolean;

  @Column({ type: 'varchar', default: '' })
  public name: string;

  @Column({ type: 'varchar', default: '' })
  public repo_name: string;

  @PrimaryColumn({ type: 'int', generated: 'increment' })
  private id: number;
  @Column({ type: 'varchar' })
  private description: string;
  @Column({ type: 'varchar' })
  private repo_url: string;

  @CreateDateColumn({ type: 'datetime' })
  private creat_date;

  @UpdateDateColumn({ type: 'datetime' })
  private update_date;
}
