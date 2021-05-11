package com.example.swaggersample;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

	@RequestMapping(method = RequestMethod.GET, value = "/welcome")
	public String sayHello() {
		return "Hello World";
	}

	@RequestMapping(value = "/products", method = RequestMethod.GET)
	public List<String> getProducts() {
		List<String> productsList = new ArrayList<>();
		productsList.add("shampoo");
		productsList.add("oil");
		return productsList;
	}

	@RequestMapping(value = "/saveproducts", method = RequestMethod.POST)
	public String createProduct() {
		return "Product is saved successfully";
	}
}
