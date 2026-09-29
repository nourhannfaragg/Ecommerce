import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, Input, PLATFORM_ID, Signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input({required:true}) isLogin!:boolean 
 
   constructor(private flowbiteService: FlowbiteService) {}
   private readonly authService = inject(AuthService)
   private readonly cartService = inject(CartService)
   private readonly id = inject(PLATFORM_ID)
   count:Signal<number> = computed( ()=> this.cartService.countNumber());

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if(isPlatformBrowser(this.id)){
    this.getAllDataCart()
  }
  }
  

  getAllDataCart():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.countNumber.set(res.numOfCartItems);
      }
    })
  }

  signOut():void{
    this.authService.logOut()
  }

}
