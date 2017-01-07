package check_up;

import java.util.ArrayList;
import java.util.Scanner;

public class SearchName {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

//		System.out.print(s);
		ArrayList<String> name = new ArrayList();
        Scanner input = new Scanner(System.in);
        name.add("Zone");
        name.add("Zoo");
        name.add("Zombie");
        name.add("Sam");
        name.add("May");

        System.out.println("Customer List: \n" + name);
        System.out.println("Search Name begins with :");
        String letter = input.next();

        for(String s : name){
        	if(s.startsWith(letter))
        	{
        		System.out.println("Name begins with : " + letter + "  is");
        		System.out.println(s);
        		
        	}
//        	if(s.contentEquals(letter))
//        	{
//        		System.out.println("customer name content letter ");
//        		System.out.println(s);
//
//        	}
        }

	}

}
