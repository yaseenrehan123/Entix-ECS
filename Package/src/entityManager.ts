export type EntityId = number;// A entityId type
type ComponentClass<T> = new (...args: any[]) => T
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
    addComponent<T>(id: EntityId, componentClass: ComponentClass<T>, componentInstance: T) {/* adds a component to entity,
        doenst add a already added*/
        this.ensureEntityExists(id);
        const components = this.componentMap.get(id);
        if (!components?.has(componentClass)) {
            components?.set(componentClass, componentInstance);
        }
    };
    removeComponent<T>(id: EntityId, componentClass: ComponentClass<T>) {//removes a component from entity
        this.ensureEntityExists(id);
        const components = this.componentMap.get(id);
        if (components?.has(componentClass)) {
            components.delete(componentClass);
        }
    };
    getComponent<T>(id: EntityId, componentClass: ComponentClass<T>): T | undefined {// used to get a component
        this.ensureEntityExists(id);
        const components = this.componentMap.get(id);
        const requestedComponent = components?.get(componentClass) as T | undefined;
        return requestedComponent;
    };
    getAllComponents(id: EntityId): any[] {
        this.ensureEntityExists(id);
        const components = this.componentMap.get(id);
        if (!components) return [];
        return Array.from(components.values());
    };
    removeEntity(id: EntityId) {
        this.ensureEntityExists(id);
        this.entities = this.entities.filter(e => e !== id);
        this.componentMap.delete(id);
    };
    query<T extends Record<string,ComponentClass<any>>>(
        filterType: Query,
        componentsToMatch: T,
        callback: (id: EntityId, matched: {[K in keyof T]:InstanceType<T[K]>}) => void
    ) {
        for (const entity of this.entities) {
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
    }
    private ensureEntityExists(id: EntityId) {
        if (!this.entities.includes(id)) throw new Error(`Entity ${id} does not exist!`);
    };

};