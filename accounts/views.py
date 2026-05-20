import json
from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


@csrf_exempt
def signup_api(request):
     if request.method=='POST':
          data=json.loads(request.body)
          username=data.get("username")
          email=data.get("email")
          password=data.get("password")
          confirm_password=data.get("confirm_password")
          
          if not username or not email or not password or not confirm_password:
            return JsonResponse({'message':"All fields are required"},status=400)
          
          if password!=confirm_password:
            return JsonResponse({'message':"Password does not match"},status=400)
          
          if len(password)<8:
            return JsonResponse({'message':"password must be at least 8 characters"},status=400)
          
          if User.objects.filter(username=username).exists():
            return JsonResponse({'message':"Username already Exists"},status=400)
          
          if User.objects.filter(email=email).exists():
            return JsonResponse({'message':"Email already exists"},status=400)
          
          User.objects.create_user(
                 username=username,
                 email=email,
                 password=password
            )
          return JsonResponse({'message':"Account created successfuly"},status=201)
     
     return JsonResponse({'message':"Invalid request Method"},status=400)

def login_page(request):
    if request.user.is_authenticated:
            return redirect('home')
    if request.method=='POST':
        username=request.POST.get('username')
        password=request.POST.get('password')

        if not username or not password:
            messages.error(
                request,
                'All fields are required'
            )
            return render(request, 'login.html')
        user=authenticate(request,username=username,password=password)
        

        if user is not None:
            login(request,user)
            messages.success(request,'Login successful')
            return redirect('home')
    
        else:
            messages.error(request,'Invalid username or password')
        
    return render(request,'login.html')


@login_required(login_url='login')
def home(request):
    return render(request,'home.html')

@login_required(login_url='login') 
def logout_page(request):
    logout(request)
    messages.success(request,'Logged out successfully')
    return redirect('login')


