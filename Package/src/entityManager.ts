export type EntityId = number;// A entityId type
export type ComponentClass<T> = new (...args: any[]) => T
type Query = 'All' | 'Any' | 'None';

export class EntityManager {// A class to manage all the entities
    private entityCount: number = 0;//A counter for id's
    private entities: EntityId[] = [];//A array of entities
    private componentMap: Map<EntityId, Map<ComponentClass<any>, any>> = new Map();/* A nested map,
    contains EntityId with a another map containing components.*/
    createEntity(): EntityId {// create a entity
        const id: EntityId = this.entityCount;
        this.entities.push(id);
        this.componentMap.set(id, new Map());
        this.entityCount++;
        return id;
    };
    addComponent<T>(id: EntityId, componentClass: ComponentClass<T>, componentInstance: T):void {/* adds a component to entity,
        doenst add a already added*/
         if (!this.hasEntity(id)) throw new Error(`Entity ${id} does not exist!`);
        const components = this.componentMap.get(id);
        if (!components?.has(componentClass)) {
            components?.set(componentClass, componentInstance);
        }
    };
    removeComponent<T>(id: EntityId, componentClass: ComponentClass<T>):void {//removes a component from entity
         if (!this.hasEntity(id)) throw new Error(`Entity ${id} does not exist!`);
        const components = this.componentMap.get(id);
        if (components?.has(componentClass)) {
            components.delete(componentClass);
        }
    };
    getComponent<T>(id: EntityId, componentClass: ComponentClass<T>): T | undefined;
    getComponent<T>(id: EntityId, componentClass: ComponentClass<T>,strict:true): T;
    getComponent<T>(id: EntityId, componentClass: ComponentClass<T>,strict:false): T | undefined;
    getComponent<T>(id: EntityId, componentClass: ComponentClass<T>,strict?:boolean): T | undefined {// used to get a component
         if (!this.hasEntity(id)) throw new Error(`Entity ${id} does not exist!`);
        const components = this.componentMap.get(id);
        const requestedComponent = components?.get(componentClass) as T | undefined;
        if(strict && !requestedComponent){
            throw new Error(`'${componentClass.name}'` + ' COMPONENT NOT FOUND ON ENTITY: ' + id);
        }
        return requestedComponent;
    };
    getAllComponents(id: EntityId): any[] {
         if (!this.hasEntity(id)) throw new Error(`Entity ${id} does not exist!`);
        const components = this.componentMap.get(id);
        if (!components) return [];
        return Array.from(components.values());
    };
    hasComponent<T>(id:EntityId,componentClass:ComponentClass<T>):boolean {
         if (!this.hasEntity(id)) throw new Error(`Entity ${id} does not exist!`);
        return this.componentMap.get(id)?.has(componentClass) ?? false;
    };
    removeEntity(id: EntityId) {
         if (!this.hasEntity(id)) throw new Error(`Entity ${id} does not exist!`);
        this.entities = this.entities.filter(e => e !== id);
        this.componentMap.delete(id);
    };
    query<T extends Record<string,ComponentClass<any>>>(
        filterType: Query,
        componentsToMatch: T,
        callback: (id: EntityId, matched: {[K in keyof T]:InstanceType<T[K]>}) => void
    ) {
        const entitiesSnapshot = [...this.entities];

        for (const entity of entitiesSnapshot) {
            if(!this.hasEntity(entity)) continue;
            const matched = {} as {[K in keyof T]: InstanceType<T[K]>};
            const results: boolean[] = [];

            for (const key in componentsToMatch) {
                const compClass = componentsToMatch[key];
                const instance = this.getComponent(entity, compClass);
                if (instance) matched[key] = instance;
                results.push(!!instance);
            }

            let shouldCall = false;
            if (filterType === 'All') shouldCall = results.every(Boolean);
            else if (filterType === 'Any') shouldCall = results.some(Boolean);
            else if (filterType === 'None') shouldCall = results.every(r => !r);
            else throw new Error(`Unknown filter type: ${filterType}`);

            if (shouldCall) callback(entity, matched);
        }
    };
    getAllEntities():EntityId[]{
        return this.entities;
    };
    hasEntity(id:EntityId):boolean{
        if(this.entities.includes(id)) return true;
        return false;
    };

};