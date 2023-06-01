import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryColumn({ type: 'int', generated: 'increment' })
  private id;

  @Column({ type: 'char', length: 16 })
  private name;

  @Column({ type: 'char', length: 16 })
  private description;

  @Column({ type: 'char', length: 8 })
  private code;

  @Column({ type: 'varchar' })
  private permissions;

  @Column({ type: 'datetime' })
  private createDate;
}
