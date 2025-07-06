import { EntityManager, type EntityId } from "entix-ecs";

class Test{
    public a:string = "sidjsd";
};

const em:EntityManager = new EntityManager();
const entityId:EntityId = em.createEntity();
//em.addComponent(entityId,Test,new Test);
const test = em.getComponent(entityId,Test,true);
if(test){
console.log(test.a);
}
