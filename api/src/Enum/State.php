<?php

namespace App\Enum;

class State
{
    const BEJA = 'beja';
    const AGAREB = 'agareb';

    public static function getValues()
    {
        return array(
            self::AACHECH,
            self::AGAREB,
        );
    }
}
