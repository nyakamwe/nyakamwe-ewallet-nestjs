import { 
    Controller, 
    Get, 
    Post, 
    Param, 
    NotFoundException, 
    Body,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerRequestDto } from './dto/create-customer.dto';
import { ListCustomersDto } from './dto/list-customers.dto';
import { RedisService } from '../redis/redis.service';

@Controller('customers')
@ApiTags('Customers')
export class CustomersController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly redisService: RedisService
    ){}
    @Get()
    @ApiOperation({ summary: 'Listing all customers'})
    async getCustomers(){
        const cachedCustomers = await this.redisService.get('all-customers')        

        if(cachedCustomers){
            return cachedCustomers
        }

        const customers = await this.customerService.getCustomers()
        await this.redisService.set('all-customers', JSON.stringify(customers))

        return customers
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get single customer'})
    async getOneCustomer(@Param('id', ParseUUIDPipe) id:string){
        try {
            return await this.customerService.getOneCustomer(id)
        }catch(error){
            throw new NotFoundException()
        }
    }

    // Create a customer
    @Post()
    @ApiOperation({ summary: 'Create a customer'})
    createCustomer(@Body() createCustomerDto: CreateCustomerRequestDto){
        return this.customerService.create(createCustomerDto)
    }

}
