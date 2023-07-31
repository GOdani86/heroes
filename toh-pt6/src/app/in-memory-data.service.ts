import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IHero } from './utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice', categoryId: 1 },
      { id: 13, name: 'Bombasto', categoryId: 3 },
      { id: 14, name: 'Celeritas', categoryId: 2 },
      { id: 15, name: 'Magneta', categoryId: 1 },
      { id: 16, name: 'RubberMan', categoryId: 1 },
      { id: 17, name: 'Dynama', categoryId: 2 },
      { id: 18, name: 'Dr. IQ', categoryId: 3 },
      { id: 19, name: 'Magma', categoryId: 4 },
      { id: 20, name: 'Tornado', categoryId: 1 },
      { id: 21, name: 'Flash', categoryId: 4 }
    ];
    const categories = [
      { id:1, description: 'mutant'},
      { id:2, description: 'flyer'},
      { id:3, description: 'fire'},
      { id:4, description: 'fast'}
    ]
    return {heroes, categories};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: IHero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
