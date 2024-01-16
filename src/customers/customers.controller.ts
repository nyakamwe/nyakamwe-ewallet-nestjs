import { 
    Controller, 
    Get, 
    Post, 
    Param, 
    NotFoundException, 
    Body
} from '@nestjs/common';
import { ApiTags, ApiOperation,ApiParam, ApiBody } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ListCustomersDto } from './dto/list-customers.dto';

@Controller('customers')
@ApiTags('Customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService){}
    @Get()
    @ApiOperation({ summary: 'Listing all customers'})
    getCustomers(){
        return this.customerService.getCustomers()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get single customer'})
    @ApiParam({
        name: 'id',
        type: 'number'
    })
    getOneCustomer(@Param('id') id:number){
        try {
            return this.customerService.getOneCustomer(id)
        }catch(error){
            throw new NotFoundException()
        }
    }

    // Create a customer
    @Post()
    @ApiOperation({ summary: 'Create a customer'})
    createCustomer(@Body() createCustomerDto: CreateCustomerDto){
        return createCustomerDto
    }

    
}
