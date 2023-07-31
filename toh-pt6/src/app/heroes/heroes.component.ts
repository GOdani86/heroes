import { Component, OnInit, OnChanges } from '@angular/core';
import { IHero,ICategories } from '../utils/interfaces';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
}) 
export class HeroesComponent implements OnInit {
  heroes: IHero[] = [];
  heroesToShow: IHero[] = [];
  categories: ICategories[] = [];
  selectedCategory: number = 0;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
    this.getCategories();
  }

  onChanges(category: number) {
    this.filterHeroes(Number(category));
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => 
      {this.heroes = heroes
      this.onChanges(0);
      });
  }
  getCategories(): void {
    this.heroService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  add(name: string): void {
    name = name.trim();
    let categoryId = Number(this.selectedCategory);
    if (!name || !categoryId) { return; }
    this.heroService.addHero({ name, categoryId } as IHero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.onChanges(categoryId);
      });
  }

  delete(hero: IHero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  getNameCategory(hero: IHero): string {
    return `${hero.name} - ${this.getCategoryDescription(hero.categoryId)}`;
  }

  // TODO: PIPE PERSONALIZADO
  getCategoryDescription(id: number): string {
    let description: string | undefined;
    description = this.categories.find(cat => cat.id === id)?.description;
    return description? description : '';
  }

  filterHeroes(id:number): void {
    this.heroesToShow = id === 0? this.heroes : this.heroes.filter(hero => hero.categoryId === id);
  }
}
