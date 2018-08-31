<?php

namespace App\Enum;

class City
{
    const AACHECH = 'aachech';
    const AGAREB = 'agareb';

    public static function getValues()
    {
        return array(
            self::AACHECH,
            self::AGAREB,
        );
    }
}
