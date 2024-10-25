# Shipping Charge Calculator

- This is a simple shipping charge calculator that calculates the shipping charge based on the weight of the package, the distance it needs to travel and the type of shpping (standar/express). The shipping charge is calculated using the following formula:

  `shippingCharge = distance * totalWeight * transportRate`
    
      where:
        - `distance` is the distance the package needs to travel
        - `totalWeight` is the total weight of the package
        - `transportRate` is the rate of transport (standard/express)

- The REST API is built in Express.js 

### API Endpoints
    `http://localhost:3000/api/shippingCharge`

![alt text](/image/post.png)


### Test Case

- Test case is written in jest 
![alt text](/image/testcase.png)
