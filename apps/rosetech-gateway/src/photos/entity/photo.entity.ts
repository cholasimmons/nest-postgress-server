import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';

@Entity('photo')
export class PhotoEntity {  
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500, type: 'varchar', nullable: false })
    name: string;

    @Column('text')
    description: string;

    @Column()
    filename: string;

    @Column('int')
    views: number;

    @Column({ type: 'varchar' })
    user: string;

    @Column({default: true, nullable: false})
    isPublished: boolean;
}
