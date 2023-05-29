import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesServices: CountriesService){ }
  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byRegions.countries;
    this.initialValue = this.countriesServices.cacheStore.byRegions.region;
  }

  searchByRegion(term: Region){
    this.isLoading = true;
    this.selectedRegion = term;
    this.countriesServices.searchRegion(term).subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    } );
  }
}
