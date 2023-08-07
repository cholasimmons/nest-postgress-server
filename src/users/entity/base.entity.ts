import { Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    // @Column({ type: 'varchar', nullable: false, unique: true })
    id: string;

    @Column({ type: 'timestamptz', nullable: false, default: ()=>'CURRENT_DATE' })
    createdAt: Date;

    @Column({ type: 'timestamptz', nullable: true, default: null })
    updatedAt?: Date;

    @Column({type: 'boolean', default: true, nullable: false})
    isActive: boolean;
}