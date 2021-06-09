import { Component, OnInit } from '@angular/core';
import { SaveRefService } from 'src/app/services/save-ref.service';
import { LazyRefServiceService } from '../lazy-ref-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { eagerUrl } from 'src/app/angularUrl/angularUrl';

@Component({
  selector: 'app-save-refid',
  templateUrl: './save-refid.component.html',
  styleUrls: ['./save-refid.component.scss']
})
export class SaveRefidComponent implements OnInit {
  
  refID;
  noRefIdAlert = false;
  onwRefAlert = false;
  invalidRefAlert = false;
  unexpectedAlert = false;

  constructor(
    private referal: LazyRefServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  saveRef = () => {

    // for this create a component which required to be logged to save refId then redirect to product/home
    this.referal.saveRefS(this.refID).subscribe(
      data => {
        console.log(data);
        this.router.navigate([eagerUrl.home]);
      },
      (error: Response) => {
        if (error.status === 441) {
          this.noRefIdAlert = true;
        }
        else if (error.status === 442){
          this.onwRefAlert = true;
        }
        else if (error.status === 443){
          this.invalidRefAlert = true;
        }
        else {
          this.unexpectedAlert = true;
        }
      }
    );
  }

  ngOnInit(): void {
    this.refID = this.route.snapshot.paramMap.get('refId');
    this.saveRef();
  }
}
