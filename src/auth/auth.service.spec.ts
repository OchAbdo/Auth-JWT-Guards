import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UserRepository } from "./user.repository"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from "@nestjs/common";

describe('AuthService', () => {

    let service: AuthService

    let mockUserRepo = {
        createUser: jest.fn(),
        findOne: jest.fn()
    }

    const mockJwtService = {
        sign: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserRepository, useValue: mockUserRepo },
                { provide: JwtService, useValue: mockJwtService }
            ]
        }).compile()

        service = module.get<AuthService>(AuthService);
    })

    it('SignUp should call createUser', async () => {
        //fake utilisateur
        const newUser = { email: 'test@test.com', password: '12345678', firstname: 'test', lastname: 'test' }
        //the result is success 201
        mockUserRepo.createUser.mockResolvedValue(undefined)
        //for apply the createUser() function
        await service.SignUp(newUser)
        //verify if createUser use newUser or no 
        expect(mockUserRepo.createUser).toHaveBeenCalledWith(newUser)
    })


    it('SignIn should return accessJWT if credentials are correct', async () => {
        const credential = { email: 'test@test.com', password: 'pass' };
        const user = { email: 'test@test.com', password: await bcrypt.hash('pass', 10), firstname: 'test', lastname: 'test'  };

        mockUserRepo.findOne.mockResolvedValue(user);
        mockJwtService.sign.mockReturnValue('mocked_jwt');

        const result = await service.SignIn(credential);

        expect(result).toEqual({ accessJWT: 'mocked_jwt' });
        expect(mockUserRepo.findOne).toHaveBeenCalledWith('test@test.com');
        expect(mockJwtService.sign).toHaveBeenCalledWith({ email: 'test@test.com' });
    });


    it('SignIn should throw UnauthorizedException if credentials are wrong', async () => {
        const credential = { email: 'test@test.com', password: 'wrongpass' };
        const user = { email: 'test@test.com', password: await bcrypt.hash('pass', 10) };

        mockUserRepo.findOne.mockResolvedValue(user);

        await expect(service.SignIn(credential))
            .rejects
            .toThrow(UnauthorizedException);
    });


})