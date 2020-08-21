
export class Booking {
  public name: string;
  public description: string;
  public imagePath: string;

  public ic: string;
  public age: number;
  public sex: string;
  public race: string;
  public phone: number;
  public work: string;

  constructor(
    name: string, desc: string, 
    imagePath: string, ic: string,
    age: number, sex: string,
    race: string, phone: number, work: string) {

    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    
    this.ic = ic;
    this.age = age;
    this.sex = sex;
    this.race = race;
    this.phone = phone;
    this.work = work;
    
  }
}
