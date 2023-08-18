
import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
  import { UserEntity } from './entity/user.entity';
  
  @EventSubscriber()
  export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
    constructor(dataSource: DataSource) {
      dataSource.subscribers.push(this);
    }
  
    listenTo() {
      return UserEntity;
    }
  
    beforeInsert(event: InsertEvent<UserEntity>) {
      console.log(`BEFORE USER INSERTED: `, event.entity);
    }
  }
  