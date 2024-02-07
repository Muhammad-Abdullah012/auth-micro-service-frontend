import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <form className="space-y-4">
      <div>
        <Label className="text-gray-900 dark:text-gray-100" htmlFor="firstName">
          First Name
        </Label>
        <Input
          className="w-full mt-1"
          id="firstName"
          placeholder="Enter your first name"
          type="text"
          required
        />
      </div>
      <div>
        <Label className="text-gray-900 dark:text-gray-100" htmlFor="lastName">
          Last Name
        </Label>
        <Input
          className="w-full mt-1"
          id="lastName"
          placeholder="Enter your last name"
          type="text"
          required
        />
      </div>
      <div>
        <Label className="text-gray-900 dark:text-gray-100" htmlFor="username">
          Username
        </Label>
        <Input
          className="w-full mt-1"
          id="username"
          placeholder="Enter your username"
          required
          type="text"
        />
      </div>
      <div>
        <Label className="text-gray-900 dark:text-gray-100" htmlFor="email">
          Email
        </Label>
        <Input
          className="w-full mt-1"
          id="email"
          placeholder="Enter your email"
          required
          type="email"
        />
      </div>
      <div>
        <Label
          className="text-gray-900 dark:text-gray-100"
          htmlFor="dateOfBirth"
        >
          Date of Birth
        </Label>
        <Input
          className="w-full mt-1"
          id="dateOfBirth"
          required
          type="date"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div>
        <Label
          className="text-gray-900 dark:text-gray-100"
          htmlFor="phoneNumber"
        >
          Phone Number
        </Label>
        <Input
          className="w-full mt-1"
          id="phoneNumber"
          placeholder="Enter your phone number"
          type="text"
        />
      </div>
      <div>
        <Label className="text-gray-900 dark:text-gray-100" htmlFor="password">
          Password
        </Label>
        <Input
          className="w-full mt-1"
          id="password"
          placeholder="Enter your password"
          required
          type="password"
        />
      </div>
      <div>
        <Label
          className="text-gray-900 dark:text-gray-100"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </Label>
        <Input
          className="w-full mt-1"
          id="confirmPassword"
          placeholder="Confirm your password"
          required
          type="password"
        />
      </div>
      <Button
        className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  );
}
