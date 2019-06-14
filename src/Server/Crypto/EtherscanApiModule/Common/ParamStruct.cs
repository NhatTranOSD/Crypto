using System;
using System.Collections.Generic;
using System.Text;

namespace EtherscanApiModule.Common
{
    public struct NumParamStruct : IParamStruct
    {
        public NumParamStruct(string name, int value)
        {
            Name = name;
            Value = value;
        }
        public string Name;
        public int Value;

        public object getName()
        {
            return Name;
        }

        public object getValue()
        {
            return Value;
        }
    }

    public struct StringParamStruct : IParamStruct
    {
        public StringParamStruct(string name, string value)
        {
            Name = name;
            Value = value;
        }

        public string Name;
        public string Value;

        public object getName()
        {
            return Name;
        }

        public object getValue()
        {
            return Value;
        }
    }

    public interface IParamStruct
    {
        object getName();

        object getValue();

    }
}
