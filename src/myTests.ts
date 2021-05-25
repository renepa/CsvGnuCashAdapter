interface Label {
    name: string;
    id: number;

    doIt?(number): string;
}

class LabelClass {
    name: string;
    id: number;
}

let letId: number;

let myLabel: Label = {name: "test", id: letId || 123};

let myClass: LabelClass = new LabelClass();

function MyConstructor() {

    id:Number;
    name:String;
    function MyConstructor(id: number, name: string) {

        this.id = id;
        this.name = name;
    }
}
MyConstructor();

let myConstructor = new MyConstructor();
myConstructor.id = 15;
myConstructor.name = "René";