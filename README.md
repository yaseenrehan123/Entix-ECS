# Entix

## WHAT IS ENTIX?

Entix is a lightweight TS ECS lib, which uses classes as components similar to C# etc.

## GETTING STARTED

To install Entix, simply navigate to your project directory via terminal, install npm if you havent already.
Once you are in your directory run

`npm install entix`

With this entix is now in your project.

### IMPORTING ENTITY MANAGER

Using entix is pretty simple, after installing entix, simply go in your ts file,
create a new EntityManager instance.

```ts
import {EntityManager} from 'entix';

const em = new EntityManager();

```
You can name the entityManager whatever you like.

### Creating FIRST ENTITY

First we will discuss what is an entity? An entity is just a identifier or a number which can be used to identify it's components.
i.e: 0,1,2,3... these are like entities 

Now we will use EntityManager to create our entities.

```ts
import {EntityManager} from 'entix';

const em = new EntityManager();//initializing EntityManager

const ourEntity = em.createEntity();// here our entityIndex is 0.

console.log(ourEntity); //prints 0

```

### ADD COMPONENT:

After creating an entity, the next thing we need to do is add components to it.
First we will create a component, in entix, components are basically classes.
So we will create a class.

```ts
import {EntityManager} from 'entix';

class Position{
    public x:number;
    public y:number;
    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }
}

const em = new EntityManager();

const ourEntity = em.createEntity();

em.addComponent(ourEntity,Position,new Position(50,10));// adding component

```
addComponent basically takes in `(entityId,ComponentClassName,Instance)`;
So component class name is basically the name of your class, in our case Position, it can be anything
just make sure it's the same as your class.

```ts

class MoveSpeed{
    public moveSpeed:number;
    constructor(moveSpeed:number){
        this.moveSpeed = moveSpeed;
    };
};

em.addComponent(ourEntity,MoveSpeed, new MoveSpeed(20));

```
### REMOVE COMPONENT

Removing a component is also very simple, it's almost the same as adding it.

```ts
em.removeComponent(ourEntity,MoveSpeed);
```

### SYSTEMS

Now, after entities and components comes systems. A system is basically like a filter which filters entities
and uses only the required components, such as a moveSystem which may require Position and MoveSpeed component.

Entix has three types of systems.

- `'All'` – Entity must have *all* specified components.
- `'Any'` – Entity must have *at least one* specified component.
- `'None'` – Entity must have *none* of the specified components.

To write a query we first pass in it's type followed by:

```ts
em.query('All',{
    pos:Position,
    moveSpeed:MoveSpeed
},(id,{pos,moveSpeed})=>{

});

```
Now it might look complicated at first but lets say what it is.
We already defined the type of it, after defining the type we pass in the second parameter,
the name and type of our components.

```ts
{
    pos:Position,
    moveSpeed:MoveSpeed
}
```
here 'pos' and 'moveSpeed' are the names of the place holders we will define later, they can be anything,
the next is component's type or what component it is, so we will need the classname, make sure the classname is the same.

```ts
{
    pos:Position,
    speed:MoveSpeed
},(id,{pos,speed}=>{

});

```
Lastily, is the callback, we add another comman with a bracket, this will return us the components and the entity id.
so we name the placeholder for our entity'id'(again can be anything). Next we define place holder for our components,
now these must be the same as the pos:Position, we defined earlier.

Now this query will run as a normal function.

NOTE: In entix, queries does not automatically run themselves, this is to give more control over their execution order.
To run these systems in a loop is also pretty simple.

```ts
import {EntityManager} from 'entix';

class Position{
    public x:number;
    public y:number;
    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    };
};
class MoveSpeed{
    public value:number;
    constructor(value:number){
        this.value = value
    }
}

const em = new EntityManager();

const testEntity = em.createEntity();

em.addComponent(testEntity,Position,new Position(0,0));
em.addComponent(testEntity,MoveSpeed, new MoveSpeed(5));

requestAnimationFrame(update.bind(this));

function update(){
    moveSystem();
    requestAnimationFrame(update.bind(this));
};

function moveSystem(){
    em.query('All',{
        pos:Position,
        moveSpeed:MoveSpeed
    },(id,{pos,moveSpeed})=>{

        pos.x += moveSpeed.value;
        pos.y += moveSpeed.value;


        console.log(pos.x,pos.y);
    })
}

```

## EXTRAS

I hope these examples were enough to give you a grasp on this lib, but entix's features do not end here.
There are plenty of other important features to help you in development.

### GetComponent

It is used to get a component from entity.

`const posComponent:Position = em.getComponent(ourEntity,Position)`;

### GetAllComponents

Used to get all components from entity as an array

```
const components = em.getAllComponents(ourEntity);

console.log(components);
```

### RemoveEntity

Used to remove a entity, NOTE: A removed entity can no longer be used by any methods, doing so will result in error.

` em.removeEntity(ourEntity); `

### EntityId

You can even import EntityId from entix, it's just a type which is equal to number but is more specific.

```
import type{EntityId} from 'entix';

const ourEntity:EntityId = em.createEntity();

```