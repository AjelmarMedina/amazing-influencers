import { GiveawaySchema } from "@/app/api/giveaways/get/route";
import { ProductSchema } from "@/app/api/products/get/route";
import { SurveySchema } from "@/app/api/surveys/get/route";
import { UserSchema } from "@/app/api/users/create/route";

export async function getUser(userEmail: string): Promise<UserSchema | null> {
  const apiUrl = "/api/users/get";
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail
    }),
  };

  const response = await fetch(apiUrl, requestData);
  const user: UserSchema | null = await response.json();

  return user;
}

export async function getSurvey(surveyCode: string): Promise<SurveySchema | null> {
  const apiUrl = "/api/surveys/get";
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      surveyCode
    }),
  };

  const response = await fetch(apiUrl, requestData);
  const survey: SurveySchema | null = await response.json();

  return survey
}

export async function getAllProducts([userEmail, key]: string[]): Promise<ProductSchema[]> {
  // prepare request
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail
    }),
  };

  // Get order from database
  const res = await fetch("/api/products/get/all", requestData);
  const json = await res.json();
  return json;

}

export async function getAllGiveaways([userEmail, key]: string[]): Promise<GiveawaySchema[]> {
  // prepare request
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail
    }),
  };

  // Get order from database
  const res = await fetch("/api/giveaways/get/all", requestData);
  const json = await res.json();
  return json;

}

export async function createSurvey(name: string, userId: string, productId: string, giveawayIds: string[]): Promise<boolean> {
  // prepare request
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name, userId, productId, giveawayIds
    }),
  };

  // Get order from database
  const res = await fetch("/api/surveys/create", requestData);
  return res.ok;
}