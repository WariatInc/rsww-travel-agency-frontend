import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from './service/offer-service';
import { Offer } from '../common/model/offer';

@Component({
  selector: 'app-single-offer',
  templateUrl: './single-offer.component.html',
  styleUrls: ['./single-offer.component.css'],
})
export class SingleOfferComponent implements OnInit {
  private offerId: string | null | undefined;
  public offer!: Offer;
  public loadingOfferInfo: boolean = true;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get('id');
    this.offerService.getOfferInfo(this.offerId).subscribe((offer) => {
      this.offer = offer;
      this.loadingOfferInfo = false;
    });
  }
}
